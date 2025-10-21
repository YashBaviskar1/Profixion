import React from 'react';
import PDFGenerator from '../components/PDFGenerator.jsx';

const sampleData = {
	profileUrl: 'https://www.linkedin.com/in/sahil-more-16975',
	overallScore: 68,
	strengths: [
		'Complete profile',
		'Clear career progression',
		'Recommendations present',
		'Good connection count',
		'Active on LinkedIn',
	],
	weaknesses: [
		'Add job descriptions',
		'Include skills',
		'Missing summary',
		'Inconsistent naming',
	],
	recommendations: [
		'Add job descriptions',
		'Verify role',
		'Include skills',
		'Create summary',
		'Improve SEO keywords',
	],
};

const PreviewAudit = () => {
	return (
		<div style={{ minHeight: '100vh', background: '#0b0b0b', padding: 24 }}>
			<div style={{ maxWidth: 900, margin: '0 auto' }}>
				<h1 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Preview Profixion Audit PDF</h1>
				<PDFGenerator data={sampleData} />
			</div>
		</div>
	);
};

export default PreviewAudit;
