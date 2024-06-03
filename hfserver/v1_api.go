package main

import (
	"fmt"
	"net/http"
)

type V1API struct {
	test string
}

func (api V1API) ping(res http.ResponseWriter, req *http.Request) {
	fmt.Println("V1 Hyperfocus API reached!")
}

func (api V1API) handleLogin(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Login endpoint reached!")
}
