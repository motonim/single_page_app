const express = require('express')
const path = require('path')

const app = express()
const fs = require('fs')

const twit = require('twit')
const config = require('./config.js')

const Twitter = new twit(config)

var params = {
	q: 'montreal',
	result_type: 'recent',
	lang: 'en',
}

Twitter.get('search/tweets', params, function (err, data) {
	var newData = JSON.stringify(data)
	fs.writeFile('public/static/js/views/tweet.json', newData, (err) => {
		if (err) throw err
		console.log('success')
	})
})

app.get('/Twitter', function (req, res) {
	fs.readFile(
		__dirname + '/public/static/js/views/tweet.json',
		'utf8',
		function (err, data) {
			res.end(data)
		}
	)
})

app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')))

app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(process.env.PORT || 8080, () => console.log('server running....'))
