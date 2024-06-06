package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/google/UUID"
)

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

func ping(res http.ResponseWriter, req *http.Request) {
	fmt.Println("V1 Hyperfocus API reached!")
}

func logIn(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Login endpoint reached!")
}

func createRoom(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Room creation endpoint reached!")
}

func rooms(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Getting rooms reached!")
}

func findRouteV1(
	r string,
	method string,
) (func(http.ResponseWriter, *http.Request), error) {
	switch r {
	case "ping":
		return ping, nil
	case "login":
		return logIn, nil
	case "room":
		switch method {
		case "POST":
			return createRoom, nil
		default:
			return rooms, nil
		}
	default:
		return nil, fmt.Errorf("API route %s is invalid!", r)
	}
}
