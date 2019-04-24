# Backend
All the tasty backend magic that powers our epic business card app.
Deployed at https://business-card-backend.herokuapp.com/

## Register

To register a user, make a `POST` request to `/api/users/register`.

### Req Body

```

{
	"username": "test1",
	"email": "test1@test.test",
	"password": "test",
	"phone": "14384230192"
}

```

### Response

```

{
    "user_id": 1,
    "username": "test1",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJpYXQiOjE1NTU5NTExMDksImV4cCI6MTU1ODU0MzEwOX0.PA-GFVY49lyzZH6KdxGoSzLp987tSlZxf8r-gtuOP3M"
}

```

## Login

To login, make a `POST` request to `/api/users/login`

### Req Body

```

{
	"username": "test1",
	"password": "test"
}

```

### Response

```

{
    "user_id": 1,
    "username": "test1",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJpYXQiOjE1NTU5NTEzMjgsImV4cCI6MTU1ODU0MzMyOH0.lbcyCn1Ic5iSvY2FQPWv-WH4I_-nYX87t8PqeIvUq1Y"
}

```

# Business Cards

## Create business card

To create a business card, make a `POST` request to `/api/cards`

### Req Body

Note that the only required fields are `business_name`, `contact_name`, and `email`.

```

{
	"business_name": "Sesame Street Inc",
	"contact_name": "Big Bird",
	"email": "bigbird@whitehouse.gov",
	"phone": "14084206969",
	"address": "123 sesame street",
	"fax": "1234124123",
	"web_url": "lambdaschool.com"
}

```

### Response

```

{
  "message": "Success!"
}

```

## Fetch Business Cards

To get a list of business cards, make a `GET` request to `/api/cards`.

### Response

The server will respond with an object containing two arrays - one will contain the cards created by the user, the other will contain cards that the user has saved. Response will look something like this:

```

{
    "created": [
        {
            "id": 1,
            "business_name": "test",
            "contact_name": "fred",
            "email": "123@",
            "phone": null,
            "img_url": null,
            "address": null,
            "fax": null,
            "web_url": null,
            "qr_url": "http://res.cloudinary.com/dhupmye0m/image/upload/v1556042200/siem75ia7amwfg9dlqjg.png",
            "user_id": 1
        }
    ],
    "saved": [
				{
						"id": 2,
						"business_name": "Sesame Street Inc",
						"contact_name": "Big Bird",
						"email": "bigbird123@whitehouse.gov",
						"phone": "14141414742",
						"img_url": null,
						"address": "123 sesame street",
						"fax": "1234124123",
						"web_url": "lambdaschool.com",
						"qr_url": "http://res.cloudinary.com/dhupmye0m/image/upload/v1555971794/yxg34f7xeijwqgzkdl5z.png",
						"user_id": 3,
						"comment": null
				}
    ]
}

```

## Fetch Single Card

To get a single business card, make a `GET` request to `/api/cards/:id`.

### Response

The server will respond with the single business card object.

```

{
		"id": 2,
		"business_name": "Sesame Street Inc",
		"contact_name": "Big Bird",
		"email": "bigbird123@whitehouse.gov",
		"phone": "14141414742",
		"img_url": null,
		"address": "123 sesame street",
		"fax": "1234124123",
		"web_url": "lambdaschool.com",
		"qr_url": "http://res.cloudinary.com/dhupmye0m/image/upload/v1555971794/yxg34f7xeijwqgzkdl5z.png",
		"user_id": 3,
		"comment": null
}

```

## Update Business Card

To update, make a `PUT` request to `/api/cards/:id`. Remember that id can be any number, it will be the ID of the business card.

### Req Body

The body will be the same as that of the `POST` request. The only required fields are `business_name`, `contact_name`, and `email`.

```

{
	"business_name": "Sesame Street Inc",
	"contact_name": "Big Bird",
	"email": "bigbird@whitehouse.gov",
	"phone": "14084206969",
	"address": "123 sesame street",
	"fax": "1234124123",
	"web_url": "lambdaschool.com"
}

```

### Response

```

{
    "message": "Success!"
}

```

## Save a business card to your collection

To save a business card, make a `POST` request to `/api/cards/save`.

### Req Body

Note that `card_id` is the only required field, `comment` is optional.

```

{
	"card_id": 1,
	"comment": "this guy was pretty cool"
}

```

### Response

```

{
    "message": "success!"
}

```

## Delete Business Card

To delete a card, make a `DELETE` request to `/api/cards/:id`. Note that a user can only delete cards that they have created, and that by deleting your card, you also delete it off of everyone else's saved list.

### Response

```

{
    "message": "we good yo"
}

```
