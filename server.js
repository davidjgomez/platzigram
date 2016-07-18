var express = require('express');
var multer = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
 
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', function(req, res) {
	res.render('index', { title: 'Platzigram' });
})

app.get('/signup', function(req, res) {
	res.render('index', { title: 'Platzigram - Signup' });
})

app.get('/signin', function(req, res) {
	res.render('index', { title: 'Platzigram - Signin' });
})

app.get('/api/pictures', function(req, res) {
	var pictures = [
		{
			user: {
				username:'dgomez',
				avatar: 'https://s.gravatar.com/avatar/71ad2f8ab9a58b0357e9db5a0390d8b4?s=80'
			},
			url: 'https://static.pexels.com/photos/6972/summer-office-student-work.jpg',
			likes: 0,
			liked: false,
			createdAt: new Date().getTime()
		},
		{
			user: {
				username: 'dgomez',
				avatar: 'https://s.gravatar.com/avatar/71ad2f8ab9a58b0357e9db5a0390d8b4?s=80'
			},
			url: 'https://static.pexels.com/photos/7079/people-woman-girl-writing.jpg',
			likes: 1,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate() - 10)
		}
	];

	setTimeout(function() {
		res.send(pictures);
	}, 2000);
})

app.post('/api/pictures', function(req, res) {
	upload(req, res, function(err) {
		if(err) {
			return res.send(500, "Error uploading file");
		}
		res.send("File uploaded");
	})
})

app.get('/:username', function(req, res) {
	res.render('index', { title: `Platzigram - ${req.params.username}` });
})

app.get('/:username/:id', function(req, res) {
	res.render('index', { title: `Platzigram - ${req.params.username}` });
})

app.get('/api/user/:user', function(req, res) {
	var user = {
			username: `${req.params.user}`,
			avatar: 'https://s.gravatar.com/avatar/71ad2f8ab9a58b0357e9db5a0390d8b4?s=80',
			pictures: [
				{	
					id: 0,
					url: 'https://static.pexels.com/photos/6972/summer-office-student-work.jpg',
					likes: 0
				},
				{
					id: 1,
					url: 'https://static.pexels.com/photos/7079/people-woman-girl-writing.jpg',
					likes: 1
				},
				{
					id: 2,
					url: 'https://static.pexels.com/photos/6972/summer-office-student-work.jpg',
					likes: 20
				},
				{
					id: 3,
					url: 'https://static.pexels.com/photos/7079/people-woman-girl-writing.jpg',
					likes: 5
				},
				{
					id: 4,
					url: 'https://static.pexels.com/photos/6972/summer-office-student-work.jpg',
					likes: 8
				},
				{
					id: 5,
					url: 'https://static.pexels.com/photos/7079/people-woman-girl-writing.jpg',
					likes: 321
				}
			]
		};

	res.send(user);
})

app.listen(3000, function(err) {
	if(err) return console.log('Hubo un error'), process.exit(1);
	console.log('Platzigram escuchando en el puerto 3000');
})