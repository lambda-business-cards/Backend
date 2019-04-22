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
	"phone": "14084206969"
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
