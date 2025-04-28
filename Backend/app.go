package main

import (
	"fmt"
	"math"
)

func main() {
  var valueA float64 = 10
  valueB := 2.2
  valueC, valueD := 2.2, 6.6
  var test = math.Pow(10, valueA * valueB * valueC * valueD)
	fmt.Println(test)
}
