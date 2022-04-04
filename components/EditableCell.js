import React from 'react'
import styled from 'styled-components'

const CellContainer = styled.div`
  display: flex
  flex: 1 0 100%
  align-items: center
  height: 100%
  overflow: hidden
  margin: 0 -5px
  padding: 5px
  border: 1px dashed transparent
`

const Select = styled.select`
  width: 100%
  height: 30px
  margin-top: 10px
`

class EditableCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      value: this.props.cellData,
      editing: false,
    }
  }

  setTargetRef = ref => (this.targetRef = ref)

  getTargetRef = () => this.targetRef

  handleClick = () => this.setState({ editing: true })

  handleHide = e => {
    if (e.keyCode === 13 || e.key === 'Enter')
      this.setState({ editing: false })
  }

  handleChange = e =>
    this.setState({
      value: e.target.value,
    })

  render() {
    const { value, editing } = this.state
    return (
      <CellContainer ref={this.setTargetRef} onClick={this.handleClick}>
        {!editing && value}
        {editing && this.targetRef && (
          <div
          >
            <input type="text" value={value} onChange={this.handleChange} onKeyPress={this.handleHide} />
          </div>
        )}
      </CellContainer>
    )
  }
}

export default EditableCell
