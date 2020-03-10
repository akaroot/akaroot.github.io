package main

import (
	"flag"
	"log"
	"net/http"
)

var (
	dir     string
	address string
	debug bool
)

func main() {
	flag.StringVar(&dir, "dir", ".", "working directory")
	flag.StringVar(&address, "address", ":3000", "address")
	flag.BoolVar(&debug, "debug", false, "log requests")
	flag.Parse()

	log.Printf("listening on %s, serving %s\n", address, dir)

	fs := http.FileServer(http.Dir(dir))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
		if debug{
			log.Printf("%s %s\n", r.Method, r.RequestURI)
		}

		fs.ServeHTTP(w, r)
	})

	err := http.ListenAndServe(address, nil)
	if err != nil {
		log.Fatal(err)
	}
}