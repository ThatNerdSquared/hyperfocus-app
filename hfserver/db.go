package main

import (
	"fmt"
	"time"

	uuid "github.com/google/UUID"
)

func createRoom(name string) error {
	fmt.Println(fmt.Sprintf("adding room '%s' to db", name))
	//return fmt.Errorf("OH NO!")
	return nil
}

type UserAccount struct {
	CreationDate time.Time
	Id           uuid.UUID
	Username     string
}

func getUser(username string) (UserAccount, error) {
	fmt.Println(fmt.Sprintf("reading user '%s' from db", username))
	var u UserAccount

	newID, err := uuid.NewRandom()
	if err != nil {
		fmt.Println(err)
		return u, err
	}
	//return u, fmt.Errorf("OH NO!")
	return UserAccount{CreationDate: time.Now(), Id: newID, Username: "testnerd"}, nil
}
