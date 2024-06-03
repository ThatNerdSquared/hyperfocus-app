package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

func main() {
	fmt.Println("Starting up server...")
	http.HandleFunc("/", rootRequest)
	http.HandleFunc("/api/", handleAPIRequest)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", Conf.port), nil))
}

func handleAPIRequest(res http.ResponseWriter, req *http.Request) {
	var pathSegments = strings.Split(req.URL.Path, "/")
	apiVersion := pathSegments[2]
	api, err := loadAPIVersion(apiVersion)
	if err != nil {
		fmt.Println(err)
        res.WriteHeader(404)
		return
	}
	api.ping(res, req)
}

func loadAPIVersion(v string) (APIVersion, error) {
	switch v {
	case "v1":
		api := V1API{}
		return api, nil
	default:
		return nil, fmt.Errorf("API version %s is invalid!", v)
	}
}

type APIVersion interface {
	ping(res http.ResponseWriter, req *http.Request)
	handleLogin(res http.ResponseWriter, req *http.Request)
}

func rootRequest(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Root request received!")
}
