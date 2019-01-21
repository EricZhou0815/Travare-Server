## How to use

### 1. Download the file or use git commond:

```
git clone git@github.com:EricZhou0815/Travare-Server.git
```

### 2. Update the node_modules based on the package.json

### 3. Start the server

```
npm run watch
```

## ROUTES:

Root: http://localhost:4000/api/

## USER/AUTH

### 1. Register

URL: http://localhost:4000/api/auth/register

Method: POST

#### 1.1. Register with username and password. For example:
```
{
    "username":"Lynn Liu",
    "password":"new password"
}
```

#### 1.2. Register with third party token and id. Put token under 'thirdPartyAuth' and id under 'username'. For example:
```
{
    "username":"agj35ogpdfnb53ygfdsafnvfeg45g2fds",
    "thirdPartyAuth":"dsafjbdanfgadfdavgsdafsdagsafs"
}
```

In both situations, the server will return json with id, username, and token. For example:
```
{
    "id": "5c423ed07593247fd9b5abfd",
    "username": "Lynn Liu",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDIzZWQwNzU5MzI0N2ZkOWI1YWJmZCIsInVzZXJuYW1lIjoiTHlubiBMaXUiLCJpYXQiOjE1NDc4NDUzMzB9.wfkPby_wCc5ZBXwH80NyJPRzEXHFu4l6MEVnouWjv8M"
}
```

Please save your token at a safe place, it will be used for further request.


### 2. Login

URL: http://localhost:4000/api/auth/login

Method: POST

#### 2.1. Login with username and password, for example:

```
{
    "username":"Maggie Qu",
    "password":"password"
}
```
#### 2.2 Login with third party token, for example:
```
{
    "thirdPartyAuth":"ghbejbnsgufsafbdb3egshd"
}
```
In both situations, the server will return a json with user id, username and token, for example:
```
{
    "id": "5c4534ecd5cc2ce5e6c665d5",
    "username": "fdsnagi3gndavsaddfbd",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDUzNGVjZDVjYzJjZTVlNmM2NjVkNSIsInVzZXJuYW1lIjoiZmRzbmFnaTNnbmRhdnNhZGRmYmQiLCJpYXQiOjE1NDgwMzk0MzN9.zKTZyvhp7GQaqAyoiYKmoL2uFAzoV9XzEme8xV0mM7E"
}
```

### 3. Profile

#### 3.1. Update User Profile

URL: http://localhost:4000/api/auth/profile

Method: POST	

Send request with header (contains your user token that server return to you when registering) and body (contains profile information for update). 

The header should be: 

KEY: Authorization

VALUE: Bearer [Your token]

A header example is shown as below:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjM2ZmZmQ3ZDUyMjEzZjc1ZmJhMjU2YSIsInVzZXJuYW1lIjoiSkMgQ2hvbmciLCJpYXQiOjE1NDc2OTgxMzZ9.OaGbcodQcfKikXQC0vYPC5_tMTQSjGPpphM8CmUTUUo
```

The request body should at least include the contents as shown in the example below:

```
{
	"firstName":"Maggie",
	"lastName":"Lu",
	"city":"Auckland",
	"country":"New Zealand",
	"about":"A CS grad, love to travel.",
	"mobile":"0212526546"
}
```

The server will save the profile content and return the saved user profile, for example:
```
{
    "stars": 0,
    "greenLevel": 1,
    "_id": "5c4534ecd5cc2ce5e6c665d5",
    "username": "fdsnagi3gndavsaddfbd",
    "thirdPartyAuth": "ghbejbnsgufsafbdb3egshd",
    "created": "2019-01-21T02:56:44.448Z",
    "__v": 0,
    "firstName": "Maggie",
    "lastName": "Lu",
    "city": "Auckland",
    "about": "A CS grad, love to travel.",
    "country": "New Zealand",
    "mobile": 212526546
}
```

#### 3.2. Get User Profile

URL: http://localhost:4000/api/auth/profile

Method: GET

To get user profile, only request header with token is required, no request body is required. For example:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjM2ZmZmQ3ZDUyMjEzZjc1ZmJhMjU2YSIsInVzZXJuYW1lIjoiSkMgQ2hvbmciLCJpYXQiOjE1NDc2OTgxMzZ9.OaGbcodQcfKikXQC0vYPC5_tMTQSjGPpphM8CmUTUUo
```

The server will also return a user profile, for example:
```
{
    "stars": 0,
    "greenLevel": 1,
    "_id": "5c4534ecd5cc2ce5e6c665d5",
    "username": "fdsnagi3gndavsaddfbd",
    "thirdPartyAuth": "ghbejbnsgufsafbdb3egshd",
    "created": "2019-01-21T02:56:44.448Z",
    "__v": 0,
    "about": "A CS grad, love to travel.",
    "city": "Auckland",
    "country": "New Zealand",
    "firstName": "Maggie",
    "lastName": "Lu",
    "mobile": 212526546
}
```

## JOURNEY:

### 1. Create a Journey

URL:localhost:4000/api/journeys

Method: POST

Send the request header with token and request body in json format as example below:
```
    {
        "fromLocation":{
            "name":Unitec,
            "area":Auckland,
            "loc":{
                "type":"Point",
                "coordinates":[
                    -2834.365345,
                    874.243242
                ]
            }
        },
        "toLocation":{
            "name":City Centre,
            "area":Auckland,
            "loc":{
                "type":"Point",
                "coordinates":[
                    -2834.3890,
                    874.262542
                ]
            }
        },
        "dateTime":1547786374967,
        "numberOfPeople":2,
        "publisher":"5c3fd714e047373a9284bd7c",
        "role":"driver",
        "status":"matching",
    }
```

The server will return the whole journey information that is just saved. For example:

```
{
    "fromLocation": {
        "loc": {
            "coordinates": [
                -36.205871,
                174.795089
            ],
            "type": "Point"
        },
        "name": "Carington",
        "area": "Auckland"
    },
    "toLocation": {
        "loc": {
            "coordinates": [
                -36.530007,
                174.707912
            ],
            "type": "Point"
        },
        "name": "Free hill",
        "area": "Auckland"
    },
    "role": "passenger",
    "status": "matching",
    "matchedUser": [],
    "chatedUser": [],
    "_id": "5c453f6aa08d9512ce8c3a59",
    "dateTime": "2019-05-25T15:04:34.967Z",
    "numberOfPeople": 2,
    "publisher": "5c4534ecd5cc2ce5e6c665d5",
    "created": "2019-01-21T03:41:30.224Z",
    "__v": 0
}
```

### 2. Show Journeys: return all journeys of a user
URL:localhost:4000/api/journeys

Method:GET

Send just the request header with token as example below:




### 3. Get a Journey: return all details of a journey
URL:localhost:4000/api/journeys/id

Method:GET





### 3. Match and Recommend Journeys:
URL:localhost:4000/api/journeys/id

Method:POST







### 4. Change Journey Status
URL:localhost:4000/api/journeys/id

Method:PUT





### 5. Delete a Journey
URL:localhost:4000/api/journeys/id

Method:DELETE




### 6. Rate a Journey
URL:localhost:4000/api/journeys/id/rate

Method:POST
















