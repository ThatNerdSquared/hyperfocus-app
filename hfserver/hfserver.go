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

	route := ""
	if len(pathSegments) > 3 {
		route = pathSegments[3]
	}
	routeHandler, err := api(route, req.Method)
	if err != nil {
		fmt.Println(err)
		res.WriteHeader(404)
		return
	}

	routeHandler(res, req)
}
func rootRequest(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Root request received!")
}

type RouteFinder func(
	route string,
	method string,
) (func(http.ResponseWriter, *http.Request), error)

func loadAPIVersion(v string) (RouteFinder, error) {
	switch v {
	case "v1":
		return findRouteV1, nil
	default:
		return nil, fmt.Errorf("API version %s is invalid!", v)
	}
}
