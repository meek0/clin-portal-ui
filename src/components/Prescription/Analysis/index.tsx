/* eslint-disable no-console */
import { useDispatch } from 'react-redux';
import { Form } from 'antd';
import { isUndefined } from 'lodash';

import { usePrescriptionForm } from 'store/prescription';
import { prescriptionFormActions } from 'store/prescription/slice';

import { StepsMapping } from './stepMapping';

const PrescriptionAnalysis = () => {
  const dispatch = useDispatch();
  const { currentStep, lastStepIsNext } = usePrescriptionForm();

  return (
    <Form.Provider
      onFormFinish={(formName, info) => {
        // Handle every form submission here
        console.log('Form name: ', formName);
        console.log('Form data: ', info.values);

        dispatch(prescriptionFormActions.saveStepData(info.values));

        if (lastStepIsNext) {
          dispatch(prescriptionFormActions.goToLastStep());
        } else if (!isUndefined(currentStep?.nextStepIndex)) {
          dispatch(prescriptionFormActions.nextStep());
        }
      }}
    >
      {StepsMapping[currentStep?.id!]}
    </Form.Provider>
  );
};

export default PrescriptionAnalysis;
