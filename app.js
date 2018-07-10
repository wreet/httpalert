var sg = require("@sendgrid/mail");
var express = require("express");
var bp = require("body-parser");

app = express();

// settings
PORT = 8080;

// server options
app.disable("x-powered-by");
app.use(bp.json()); // support json encoded bodies
app.use(bp.urlencoded({ extended: true })); // support encoded bodies

// start it
app.listen(PORT, "localhost");

app.all("*", function(req, res, next) {
	resp = {
		headers: req.headers,
		remote_ips: req.ips,
		method: req.method,
		path: req.path,
		query_string: req.query,
		body: req.body
	}
	resp = JSON.stringify(resp, null, 2);
	res.send(resp);
	sg.setApiKey(process.env.SG_API_KEY);
	sg.send({
		to: "chasehx@gmail.com",
		from: "web@lawl.sh",
		subject: "Req from: " + req.headers['x-forwarded-for'],
		text: resp
	});
});
