package main

import (
	"encoding/json"
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

type LoginBody struct {
	Username string
	RoomCode string
}

func loginRoute(res http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var data LoginBody
	err := decoder.Decode(&data)
	if err != nil {
		fmt.Println("loginRoute JSON decoding error!")
		res.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	user, err := getUser(data.Username)
	if err != nil {
		res.WriteHeader(http.StatusUnprocessableEntity)
		json.NewEncoder(res).Encode(
			map[string]string{"error": "USERNAME_INVALID"},
		)
		return
	}
    fmt.Println(user)
	json.NewEncoder(res).Encode(user)
}

type RoomCreationBody struct {
	RoomName string
}

func roomCreationRoute(res http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var data RoomCreationBody
	err := decoder.Decode(&data)
	if err != nil {
		fmt.Println("roomCreationRoute JSON decoding error!")
		res.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	err = createRoom(data.RoomName)
	if err != nil {
		res.WriteHeader(http.StatusUnprocessableEntity)
		json.NewEncoder(res).Encode(
			map[string]string{"error": "ROOM_ALREADY_EXISTS"},
		)
		return
	}
	fmt.Println("Room creation endpoint reached!")
}

func roomsRoute(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Getting rooms reached!")
}

type Room struct {
	creationDate time.Time
	id           uuid.UUID
	name         string
	participants []uuid.UUID
	presets      []int
}
