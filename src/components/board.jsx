import React from 'react'
import { connect } from 'react-redux'

export const BoardComponent = () => <div>board</div>

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent)