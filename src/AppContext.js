import React, { Component } from 'react'

const AppContext = React.createContext({
    term: '',
    items: [],
    selectedDays: [],
    selectedDay: "",
    error: null,
    setError: () => {},
    getItems: () => {},
    addItem: () => {},
    removeItem: () => {},
    handleDateClicked: () => {},
    setTerm: () => {},
    setDays: () => {},
    setDay: () => {},
    editItem: () => {},
  })
  
  export default AppContext