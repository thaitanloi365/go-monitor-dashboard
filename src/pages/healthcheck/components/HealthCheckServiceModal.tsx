import React from 'react';
import { connect } from 'dva';
import { DatePicker, Form, Input, Modal, Row, Select, Button, InputNumber } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import moment from 'moment';
import { IFormProps, IConnectState, IModalProps } from 'types';

const { Option } = Select;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

interface IProps extends IConnectState, IFormProps, Partial<IModalProps> {
  item: IJobHealthCheck;
  onAccept: (item: IJobHealthCheck) => void;
}

@connect<IProps>(({ app, containers, loading }: IProps) => ({ app, containers, loading }))
class HealthCheckServiceModal extends React.PureComponent<IProps> {
  formRef = React.createRef<Form>();

  handleOk = () => {
    const { item, onAccept, form } = this.props;
    const { validateFields, getFieldsValue } = form;

    validateFields((errors: any) => {
      if (errors) {
        return;
      }
      const data: any = {
        ...getFieldsValue(),
      };

      onAccept(data);
    });
  };

  validateURL = (rule: string, value: string, callback: (msg?: string) => void) => {
    if (value && !value.startsWith('http')) {
      callback('Must be a valid URL');
    } else {
      callback();
    }
  };

  validateTimeout = (rule: string, value: number, callback: (msg?: string) => void) => {
    const { form } = this.props;

    if (value && value >= form.getFieldValue('interval')) {
      callback('Must be less than interval');
    } else {
      callback();
    }
  };
  render() {
    const { item, loading, form, ...modalProps } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form ref={this.formRef} {...formItemLayout}>
          <FormItem label={'Tag'} hasFeedback={true}>
            {getFieldDecorator('tag', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input onPressEnter={this.handleOk} placeholder="Tag" />)}
          </FormItem>
          <FormItem label={'Endpoint'} hasFeedback={true}>
            {getFieldDecorator('endpoint', {
              rules: [
                {
                  required: true,
                  validator: this.validateURL,
                },
              ],
            })(<Input onPressEnter={this.handleOk} placeholder="Endpoint" />)}
          </FormItem>
          <FormItem label={'Interval'} hasFeedback={true}>
            {getFieldDecorator('interval', {
              initialValue: 30,
              rules: [
                {
                  required: true,
                },
              ],
            })(<InputNumber min={10} step={5} />)}
          </FormItem>
          <FormItem label={'Timeout'} hasFeedback={true}>
            {getFieldDecorator('timeout', {
              initialValue: 20,
              rules: [
                {
                  required: true,
                  validator: this.validateTimeout,
                },
              ],
            })(<InputNumber min={10} step={5} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create<IProps>()(HealthCheckServiceModal);
