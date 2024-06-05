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

func loadAPIVersion(v string) (APIVersion, error) {
	switch v {
	case "v1":
		return V1API{}, nil
	default:
		return nil, fmt.Errorf("API version %s is invalid!", v)
	}
}

func findRoute(
	v string,
	method string,
	api APIVersion,
) (func(http.ResponseWriter, *http.Request), error) {
	switch v {
	case "ping":
		return api.ping, nil
	case "login":
		return api.logIn, nil
	case "room":
		switch method {
		case "POST":
			return api.createRoom, nil
		default:
			return api.rooms, nil
		}
	case "startTimer":
		return api.startTimer, nil
	case "toggleRunning":
		return api.toggleRunning, nil
	case "presets":
		switch method {
		case "POST":
			return api.addPreset, nil
		case "DELETE":
			return api.deletePreset, nil
		default:
			return api.presets, nil
		}
	default:
		return nil, fmt.Errorf("API route %s is invalid!", v)
	}
}
