import React from 'react';
import { Button, Col, Input, Row, Form } from 'antd';
import { IFormProps } from 'types';
import { formatDate } from 'utils/date';

const { Search } = Input;

interface IFilter {
  keyword?: string;
}
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
};

const TwoColProps = {
  ...ColProps,
  xl: 96,
};

interface IFilterProps extends IFormProps {
  hideResetButton?: boolean;
  onFilterChange: (fields: IFilter) => void;
  onSearchChange?: (name: string) => void;
}

class Filter extends React.PureComponent<IFilterProps> {
  handleFields = (fields: any) => {
    const { createTime } = fields;
    if (createTime?.length) {
      fields.createTime = [formatDate(createTime[0]), formatDate(createTime[1])];
    }
    return fields;
  };

  handleSubmit = () => {
    const { onFilterChange, form } = this.props;
    const { getFieldsValue } = form;

    let fields: any = getFieldsValue();
    fields = this.handleFields(fields);
    onFilterChange(fields);
  };

  handleReset = () => {
    const { form } = this.props;
    const { getFieldsValue, setFieldsValue } = form;

    const fields = getFieldsValue();
    for (const item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    setFieldsValue(fields);
    this.handleSubmit();
  };
  handleChange = (key: any, values: any) => {
    const { form, onFilterChange } = this.props;
    const { getFieldsValue } = form;

    let fields: any = getFieldsValue();
    fields[key] = values;
    fields = this.handleFields(fields);
    onFilterChange(fields);
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onSearchChange } = this.props;
    if (typeof onSearchChange === 'function') {
      onSearchChange(event.target.value);
    }
  };

  render() {
    const { form, hideResetButton } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
          {getFieldDecorator('keyword')(
            <Search placeholder="Search keyword" onSearch={this.handleSubmit} onChange={this.handleSearchChange} />
          )}
        </Col>

        <Col {...TwoColProps} xl={{ span: 18 }} md={{ span: 16 }} sm={{ span: 24 }}>
          <Row type="flex" align="middle" justify="space-between">
            <div>
              <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
                Search
              </Button>
              {!hideResetButton && <Button onClick={this.handleReset}>Reset</Button>}
            </div>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Form.create<IFilterProps>({ name: 'filter' })(Filter);
