package main

import (
	"fmt"
	"net/http"
)

type V1API struct {
	test string
}

func (api V1API) ping(
	res http.ResponseWriter,
	req *http.Request,
) {
	fmt.Println("V1 Hyperfocus API reached!")
}

func (api V1API) logIn(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Login endpoint reached!")
}

func (api V1API) createRoom(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Room creation endpoint reached!")
}

func (api V1API) rooms(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Getting rooms reached!")
}

func (api V1API) startTimer(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Timer start reached!")
}

func (api V1API) toggleRunning(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Toggle running reached!")
}

func (api V1API) addPreset(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Preset add reached!")
}

func (api V1API) deletePreset(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Preset delete reached!")
}

func (api V1API) presets(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Getting presets reached!")
}
