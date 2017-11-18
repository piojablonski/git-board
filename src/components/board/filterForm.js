import React from 'react'
import { Select, Button } from 'antd'
const { Option } = Select

export const FilterForm = ({ options, selectedFilters, filterChangedHandler, filtersApplyHandler }) => {
  return (
    <div>
      <Select placeHolder='State'
        defaultValue={selectedFilters.state}
        onChange={value => filterChangedHandler(value, 'state')} >
        {options.state.map(s => <Option key={s.value} value={s.value}>{s.name}</Option>)}
      </Select>
      <Button onClick={filtersApplyHandler}>Search</Button>
    </div>
  )
}
