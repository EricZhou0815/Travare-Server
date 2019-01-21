## ROUTES:

Root: http://localhost:4000/api/

## USER/AUTH

1. Register

URL: http://localhost:4000/api/auth/register

Method: POST

1.1. Register with username and password. For example:
```
{
	"username":"Lynn Liu",
	"password":"new password"
}
```

1.2. Register with third party token and id. Put token under 'thirdPartyAuth' and id under 'username'. For example:
```
{
	"username":"agj35ogpdfnb53ygfdsafnvfeg45g2fds",
	"thirdPartyAuth":"dsafjbdanfgadfdavgsdafsdagsafs"
}
```

In both situation, the server will return json with id, username, and token. For example:
```
{
    "id": "5c423ed07593247fd9b5abfd",
    "username": "Lynn Liu",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDIzZWQwNzU5MzI0N2ZkOWI1YWJmZCIsInVzZXJuYW1lIjoiTHlubiBMaXUiLCJpYXQiOjE1NDc4NDUzMzB9.wfkPby_wCc5ZBXwH80NyJPRzEXHFu4l6MEVnouWjv8M"
}
```

2. Login: auth/login (post)

URL: http://localhost:4000/api/auth/login

Method: POST

2.1. Login with username and password



## JOURNEY:

Create: journeys/ (post)

Journey Json example:
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



