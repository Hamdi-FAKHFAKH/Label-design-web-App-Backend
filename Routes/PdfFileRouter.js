const express = require("express");
const Router = express.Router();
const fs = require("fs");
//check if label file exist
Router.route("/")
	.get((req, res) => {
		if (fs.existsSync(req.query.path)) {
			res.status(200).json({ exist: true, message: "File Found" });
		} else {
			res.status(204).json({ exist: false, message: "File Not Found" });
		}
	})
	.delete((req, res) => {
		fs.unlink(req.query.path, (err) => {
			if (!err) {
				res.status(200).json({ deleted: true, message: "File deleted" });
			} else {
				res.status(200).json({ deleted: false, message: "File not deleted" });
			}
		});
	})
	.post((req, res) => {
		const pdfString = req.body.data.split(",")[1];
		fs.writeFile(
			`./PdfFiles/${req.body.fileName}`,
			pdfString,
			"base64",
			function (err) {
				console.log(err);
			}
		);
		res.status(200).json({
			msg: "success",
		});
	});
module.exports = Router;
