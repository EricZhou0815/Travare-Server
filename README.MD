ROUTES:
Root: http://localhost:4000/api/

USER/AUTH
Register: auth/register  (post)
Login: auth/login (post)

JOURNEY
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



