import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createParkingSpace } from 'apiSdk/parking-spaces';
import { parkingSpaceValidationSchema } from 'validationSchema/parking-spaces';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { ParkingSpaceInterface } from 'interfaces/parking-space';

function ParkingSpaceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ParkingSpaceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createParkingSpace(values);
      resetForm();
      router.push('/parking-spaces');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ParkingSpaceInterface>({
    initialValues: {
      location: '',
      size: 0,
      availability_times: '',
      restrictions: '',
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: parkingSpaceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Parking Spaces',
              link: '/parking-spaces',
            },
            {
              label: 'Create Parking Space',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Parking Space
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.location}
            label={'Location'}
            props={{
              name: 'location',
              placeholder: 'Location',
              value: formik.values?.location,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Size"
            formControlProps={{
              id: 'size',
              isInvalid: !!formik.errors?.size,
            }}
            name="size"
            error={formik.errors?.size}
            value={formik.values?.size}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('size', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.availability_times}
            label={'Availability Times'}
            props={{
              name: 'availability_times',
              placeholder: 'Availability Times',
              value: formik.values?.availability_times,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.restrictions}
            label={'Restrictions'}
            props={{
              name: 'restrictions',
              placeholder: 'Restrictions',
              value: formik.values?.restrictions,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/parking-spaces')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'parking_space',
    operation: AccessOperationEnum.CREATE,
  }),
)(ParkingSpaceCreatePage);
