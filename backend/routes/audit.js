import { Router } from 'express';
import supabase from '../supabaseClient.js';

const router = Router();

/**
 * @route   POST /api/audit/submit
 */
router.post('/submit', async (req, res) => {
  const { profileUrl } = req.body;

  if (!profileUrl) {
    return res.status(400).json({ msg: 'Please provide a profile URL' });
  }

  const trackingId = `audit_${Date.now()}`;

  // Insert into Supabase
  const { data, error } = await supabase
    .from('audits')
    .insert([
      { tracking_id: trackingId, profile_url: profileUrl, status: 'pending' }
    ])
    .select();

  if (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: 'Database insert failed' });
  }

  res.json({
    success: true,
    message: 'Profile submitted for audit successfully.',
    data: { trackingId }
  });
});

/**
 * @route   GET /api/audit/status/:trackingId
 */
router.get('/status/:trackingId', async (req, res) => {
  const { trackingId } = req.params;

  const { data, error } = await supabase
    .from('audits')
    .select('tracking_id, status')
    .eq('tracking_id', trackingId)
    .single();

  if (error || !data) {
    return res.status(404).json({ success: false, msg: 'Audit not found' });
  }

  res.json({
    success: true,
    data: {
      trackingId: data.tracking_id,
      status: data.status,
      message: `Audit is currently ${data.status}.`
    }
  });
});

/**
 * @route   GET /api/audit/list
 */
router.get('/list', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('audits')
      .select('tracking_id, profile_url, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching audits:', error);
      return res.status(500).json({ success: false, msg: 'Failed to fetch audits' });
    }

    res.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

/**
 * @route   GET /api/audit/results/:trackingId
 */
router.get('/results/:trackingId', async (req, res) => {
  const { trackingId } = req.params;

  // For now, just fetch from Supabase and return dummy results
  const { data, error } = await supabase
    .from('audits')
    .select('*')
    .eq('tracking_id', trackingId)
    .single();

  if (error || !data) {
    return res.status(404).json({ success: false, msg: 'Audit not found' });
  }

  const reportData = {
    profileUrl: data.profile_url,
    overallScore: 85,
    strengths: [
      "Strong headline and summary.",
      "Consistent activity and engagement.",
      "Well-defined work experience."
    ],
    weaknesses: [
      "Profile picture could be more professional.",
      "Missing a banner image."
    ],
    recommendations: [
      "Upload a high-resolution headshot.",
      "Create a custom banner that reflects your personal brand.",
      "Add more skills to your profile."
    ]
  };

  res.json({
    success: true,
    data: reportData
  });
});

export default router;
