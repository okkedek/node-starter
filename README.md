# Node Express starter


Run in dev mode:
```bash
HOST=0.0.0.0 PORT=3000 npm run dev
```

Build and run the docker image:
```bash
$ docker build -t app .
$ docker -e HOST=0.0.0.0 -e PORT=3000 run -p 3000:3000 --name app app
```

http://localhost:3000/api
