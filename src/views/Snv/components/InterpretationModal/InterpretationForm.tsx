import { AutoComplete, Form, Radio, Select, Tooltip } from 'antd';

import RichTextEditor from 'components/uiKit/RichTextEditor';

const InterpretationForm = () => (
  <Form layout="vertical">
    <Form.Item label="Condition" name="condition">
      <AutoComplete placeholder="Rechercher une condition" />
    </Form.Item>
    <Form.Item
      label="Classification"
      name="classification"
      style={{
        marginBottom: 12,
      }}
    >
      <Radio.Group>
        <Radio.Button value="LA6668-3">Pathogénique</Radio.Button>
        <Tooltip title="Probablement pathogénique">
          <Radio.Button value="LA26332-9">Prob. pathogénique</Radio.Button>
        </Tooltip>
        <Tooltip title="Variant de signification incertaine">
          <Radio.Button value="LA26333-7">VSI</Radio.Button>
        </Tooltip>
        <Tooltip title="Probablement bénigne">
          <Radio.Button value="LA26334-5">Prob. bénigne</Radio.Button>
        </Tooltip>
        <Radio.Button value="LA6675-8">Bénigne</Radio.Button>
      </Radio.Group>
    </Form.Item>
    <Form.Item name="criteria-classification">
      <Select placeholder="Critères de classification" />
    </Form.Item>
    <Form.Item label="Mode de transmission" name="transmission-mode">
      <Select placeholder="Sélectionner" mode="multiple" />
    </Form.Item>
    <Form.Item label="Interprétation" name="interpretation">
      <RichTextEditor />
    </Form.Item>
  </Form>
);

export default InterpretationForm;
