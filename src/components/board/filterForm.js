import React from 'react'
import { Select, Input, Button, Radio } from 'antd'
import { FilterWrapper } from './styled'
const { Option } = Select
const { Group: RadioGroup } = Radio

export const FilterForm = ({ options, selectedFilters, filterChangedHandler, filtersApplyHandler }) => {
  return (
    <FilterWrapper>
      <label>sort by</label>
      <RadioGroup
        value={selectedFilters.sort}
        onChange={({ target: { value } }) => filterChangedHandler(value, 'sort')}
      >
        {options.sort.map(o => <Radio key={o.value} value={o.value}>{o.name}</Radio>)}
      </RadioGroup>
      <label>sort direction</label>
      <RadioGroup
        value={selectedFilters.direction}
        onChange={({ target: { value } }) => filterChangedHandler(value, 'direction')}
      >
        {options.direction.map(o => <Radio key={o.value} value={o.value}>{o.name}</Radio>)}
      </RadioGroup>
      <label>state</label>
      <Select
        value={selectedFilters.state}
        onChange={value => filterChangedHandler(value, 'state')} >
        {options.state.map(s => <Option key={s.value} value={s.value}>{s.name}</Option>)}
      </Select>
      <label>assignee</label>
      <Select placeholder='choose...'
        showSearch
        allowClear
        value={selectedFilters.assignee}
        onChange={value => filterChangedHandler(value, 'assignee')} >
        {options.assignees.map(s => <Option key={s.value} value={s.value}>{s.name}</Option>)}
      </Select>
      <label>creator</label>
      <Select placeholder='choose...'
        showSearch
        allowClear
        value={selectedFilters.creator}
        onChange={value => filterChangedHandler(value, 'creator')} >
        {options.creators.map(s => <Option key={s.value} value={s.value}>{s.name}</Option>)}
      </Select>
      <label>label</label>
      <Select placeholder='choose...'
        showSearch
        allowClear
        mode='tags'
        value={selectedFilters.labels}
        onChange={value => filterChangedHandler(value, 'labels')} >
        {options.labels.map(s => <Option key={s.value} value={s.name}>{s.name}</Option>)}
      </Select>
      <label>milestone</label>
      <Select placeholder='choose...'
        showSearch
        allowClear
        value={selectedFilters.milestone}
        onChange={value => filterChangedHandler(value, 'milestone')} >
        {options.milestones.map(s => <Option key={s.value} value={s.value}>{s.name}</Option>)}
      </Select>
      <label>mentioned</label>
      <Input
        value={selectedFilters.mentioned}
        onChange={({ target: { value } }) => filterChangedHandler(value, 'mentioned')}
      />
      <Button onClick={filtersApplyHandler}>Search</Button>
    </FilterWrapper>
  )
}
