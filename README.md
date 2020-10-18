# clusterization-ui

## Project description
This UI is being developed to serve different views on point data retrieved from a backend service 
(https://github.com/barblin/clusterization-service)

It offers to select from a set of files, and a set of views to produce individual representations of the point data.

As of now just local startup is possible. So get the service first https://github.com/barblin/clusterization-service.
Make it run
Start frontend, ready to go

### Currently supported views
* Simple plot of point data and color labels
* Simple plot of data being clustered by the current wasserstein distance calculation
* Line plot of delaunay triangulation data
* Line plot of minimum spanning tree produced from the delaunay triangulation graph

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
