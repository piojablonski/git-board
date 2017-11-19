import React from 'react'
import { Select, Button } from 'antd'
import { FilterWrapper } from './styled';
const { Option } = Select

export const FilterForm = ({ options, selectedFilters, filterChangedHandler, filtersApplyHandler }) => {
  return (
    <FilterWrapper>
      <label>state</label>
      <Select
        defaultValue={selectedFilters.state}
        onChange={value => filterChangedHandler(value, 'state')} >
        {options.state.map(s => <Option key={s.value} value={s.value}>{s.name}</Option>)}
      </Select>
      <label>assignee</label>
      <Select placeholder='choose...'
        showSearch
        defaultValue={selectedFilters.assignee}
        onChange={value => filterChangedHandler(value, 'assignee')} >
        {options.assignees.map(s => <Option key={s.value} value={s.value}>{s.name}</Option>)}
      </Select>
      <label>creator</label>
      <Select placeholder='choose...'
        showSearch
        allowClear
        defaultValue={selectedFilters.creator}
        onChange={value => filterChangedHandler(value, 'creator')} >
        {options.creators.map(s => <Option key={s.value} value={s.value}>{s.name}</Option>)}
      </Select>
      <label>label</label>
      <Select placeholder='choose...'
        showSearch
        allowClear
        mode='tags'
        defaultValue={selectedFilters.labels}
        onChange={value => filterChangedHandler(value, 'labels')} >
        {options.labels.map(s => <Option key={s.value} value={s.name}>{s.name}</Option>)}
      </Select>
      <Button onClick={filtersApplyHandler}>Search</Button>
    </FilterWrapper>
  )
}
