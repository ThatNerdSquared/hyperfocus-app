package main

import (
	"fmt"
	"net/http"
)

type APIVersion interface {
	ping(res http.ResponseWriter, req *http.Request)
	logIn(res http.ResponseWriter, req *http.Request)
	createRoom(res http.ResponseWriter, req *http.Request)
	rooms(res http.ResponseWriter, req *http.Request)
	startTimer(res http.ResponseWriter, req *http.Request)
	toggleRunning(res http.ResponseWriter, req *http.Request)
	addPreset(res http.ResponseWriter, req *http.Request)
	deletePreset(res http.ResponseWriter, req *http.Request)
	presets(res http.ResponseWriter, req *http.Request)
}

