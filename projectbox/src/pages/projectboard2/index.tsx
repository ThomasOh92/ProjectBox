import React, { PureComponent, CSSProperties } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import RGL, { Layout, Layouts } from "react-grid-layout";
import styles from './projectboard.module.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface Item {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  add?: boolean;
  isResizable?: boolean;
  isDroppable?: boolean
}

interface State {
  items: Item[];
  newCounter: number;
  cols?: number;
  breakpoint?: string;
  layout?: Layout[];
}

interface Props {
  className?: string;
  cols?: { lg: number; md: number; sm: number; xs: number; xxs: number };
  rowHeight?: number;
  onLayoutChange?: (layout: Layout[]) => void;
}

class AddRemoveLayout extends PureComponent<Props, State> {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      items: [0, 1, 2, 3, 4].map((i, key, list): Item => {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          add: i === (list.length - 1)
        };
      }),
      newCounter: 0
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);

  }

  createElement(el: Item) {
    const removeStyle: CSSProperties = {
      position: "absolute",
      right: "2px",
      top: 0
    };
    
    const i = el.i;
    return (
      <div className={styles.gridItem} key={i} data-grid={el}>
        <span className="text">{i}</span>
        <span
          onClick={this.onRemoveItem.bind(this, i)}
          className={styles.removeItem}
          style={removeStyle}
        >
          x
        </span>
      </div>
    );
  }  
  
  onAddItem() {
    console.log("adding", this.state.newCounter);
    this.setState({
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity,
        w: 2,
        h: 2
      }),
      newCounter: this.state.newCounter + 1
    });
  }

  onBreakpointChange(breakpoint: string, cols: number) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout: Layout[]) {
    this.props.onLayoutChange?.(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i: string) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    return (
      <div>
        <button className={styles.addItemButton} onClick={this.onAddItem}>Add Item</button>
        <ResponsiveReactGridLayout
          className={styles.gridLayout}
          onLayoutChange={this.onLayoutChange.bind(this)}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default AddRemoveLayout;
