import React from 'react';
import { contextMenu } from 'react-contexify';

import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

import ComponentContext from './ComponentContext';

export default class Component extends AbstractReactFactory {
  constructor({
    type,
    name,
    description,
    group,
    configurations = [],
    model,
    widget,
    icon,
  }) {
    super(type);
    this.name = name;
    this.description = description;
    this.group = group;
    this.configurations = configurations;
    this.Model = model;
    this.Widget = widget;
    this.Icon = icon;
  }

  generateReactWidget(event) {
    const { Widget } = this;
    const { model } = event;
    this.showMenu = e => contextMenu.show({id: "component", event: e, props: model})

    return (
      <div onContextMenu={this.showMenu}>
        <ComponentContext.Provider value={model}>
          <Widget model={model} />
        </ComponentContext.Provider>
      </div>
    );
  }

  generateModel(event) {
    const { Model } = this;
    const { configurations, type } = event.initialConfig;

    return new Model(configurations, type);
  }
}
