package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/google/UUID"
)

var v1Routes = RoutesCatalog{
	"ping":  printAndRespond("Hyperfocus API V1 reached!"),
	"login": loginRoute,
	"rooms": roomsHandler,
}

func roomsHandler(res http.ResponseWriter, req *http.Request) {
	switch req.Method {
	case "POST":
		roomCreationRoute(res, req)
	default:
		roomsRoute(res, req)
	}
}

func loginRoute(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Login endpoint reached!")
}

func roomCreationRoute(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Room creation endpoint reached!")
}

func roomsRoute(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Getting rooms reached!")
}

type UserAccount struct {
	creationDate time.Time
	id           uuid.UUID
	username     string
}

type Room struct {
	creationDate time.Time
	id           uuid.UUID
	name         string
	participants []uuid.UUID
	presets      []int
}
