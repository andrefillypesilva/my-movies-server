# My Movies Server (NodeJS backend application)
It is a simple NodeJS backend project built in Javascript (ES6+).

## Instalation
After clone this repository you will need to run `npm i` to install all dependencies.

## How to run
To run this application you will need only run `npm start` as defined in the package.json file.

## How to consume this API?
### Model: _Categories_
##### Get all Categories
```
GET /categories
```
##
### Model: _Movies_
##### Get all Movies
```
GET /movies
```
##### Get a specific Movie
```ruby
GET /movies/:id 
```
##### Add a new Movie
```
POST /movies 
```
### Json Format to send
```
{
    "category": "String (Category ID)",
    "name": "String",
    "img": "String",
    "duration": "Number"
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
