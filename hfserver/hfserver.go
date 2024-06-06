package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("Starting up server...")

	http.HandleFunc("/", printAndRespond("Root endpoint reached!"))
	http.HandleFunc("/api/", printAndRespond(
		"Hyperfocus API reached! Use /api/vX/Y for route Y at API version X. Use /api/versions to view all versions.",
	))
	http.HandleFunc("/api/versions", getVersions)

	loadRoutes(1, v1Routes)

	log.Fatal(
		http.ListenAndServe(fmt.Sprintf(":%d", Conf.port), nil),
	)
}

func printAndRespond(msg string) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		fmt.Println(msg)
		res.Write([]byte(msg))
	}
}

func getVersions(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	data, err := json.Marshal([1]int{1})
	if err != nil {
		fmt.Println(err)
		return
	}
	res.Write(data)
}

type RoutesCatalog map[string]http.HandlerFunc

func loadRoutes(version int, routes RoutesCatalog) {
	for path, handler := range routes {
		var fullPath = fmt.Sprintf("/api/v%d/%s", version, path)
		http.HandleFunc(fullPath, handler)
	}
}
