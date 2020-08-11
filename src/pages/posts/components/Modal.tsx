import React from 'react';
import { DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import moment from 'moment';
import { IFormProps, IUser } from 'types';

const { Option } = Select;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

interface IModalProps extends IFormProps, ModalProps {
  item: IUser;
  onAccept: (item: IUser) => void;
}

interface IModelState {
  imageFile: File | null;
  confirmDirty: boolean;
}
class UserModal extends React.PureComponent<IModalProps, IModelState> {
  state: IModelState = {
    imageFile: null,
    confirmDirty: false,
  };

  handleOk = () => {
    const { imageFile } = this.state;
    const { item, onAccept, form } = this.props;
    const { validateFields, getFieldsValue } = form;

    validateFields((errors: any) => {
      if (errors) {
        return;
      }
      const data: any = {
        ...getFieldsValue(),
        imageFile,
        id: item?.id,
      };

      onAccept(data);
    });
  };

  render() {
    const { item, onOk, form, ...modalProps } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal"></Form>
      </Modal>
    );
  }
}

export default Form.create<IModalProps>()(UserModal);
