import React, { Component, PropTypes } from 'react';
import DesktopComponent  from '../../DesktopComponent';
import Content from '../Content/Content.windows';

const styles = {
  content: {
    position: 'relative',
    flexGrow: '1',
    flexShrink: '0',
    display: 'flex'
  }
};

@DesktopComponent
class Item extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    margin: PropTypes.string,
    padding: PropTypes.string,
    selected: PropTypes.bool
  };

  constructor(props, context, updater) {
    const {selected, ...properties} = props;
    super(properties, context, updater);
    this.state = {
      selected: selected,
      parentRequestedTheme: context.requestedTheme
    };
  }

  get splitView() {
    return this.context.parent;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.selected });
    this.refs.content.setState({selected: nextProps.selected});
  }

  componentWillUpdate(nextProps, nextState) {
    this.refs.content.setState({parentRequestedTheme: nextState.parentRequestedTheme});
  }

  render() {
    const { children, style, ...props } = this.props;
    this.splitView;

    let componentStyle = {...styles.content};

    if (!this.state.selected) {
      componentStyle.display = 'none';
    }

    return (
      <div
        style={componentStyle}
      >
        <Content
          ref="content"
          selected={this.state.selected}
          parentRequestedTheme={this.state.parentRequestedTheme}
          style={style}
          {...props}
        >
          {children}
        </Content>
      </div>
    );
  }
}

export default Item;
