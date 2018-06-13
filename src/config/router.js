module.exports = [

	// apply
	[/\/api\/apply(?:\/(\d+))?/, '/api/apply?id=:1', 'rest'], 
	['/api/apply:id?', '/api/apply', 'rest'],
	['/api/apply:id?', 'rest'],

	// scan
	[/\/api\/scan(?:\/(\d+))?/, '/api/scan?id=:1', 'rest'], 
	['/api/scan:id?', '/api/scan', 'rest'],
	['/api/scan:id?', 'rest'],


];
