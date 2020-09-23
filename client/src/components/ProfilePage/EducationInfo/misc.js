<FormikField
                    label='School Name'
                    formikProps={formikProps}
                    formikKey='schoolName'
                    required
                  />
                  <FormikField
                    label='Course Name'
                    formikProps={formikProps}
                    formikKey='courseName'
                    required
                  />
                  <div className={classes.periodInfo}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        variant='inline'
                        openTo='year'
                        views={['year', 'month']}
                        label='Start Month and Year'
                      />
                      <DatePicker
                        variant='inline'
                        openTo='year'
                        views={['year', 'month']}
                        label='End Month and year'
                      />
                    </MuiPickersUtilsProvider>
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<SchoolIcon />}
                          checkedIcon={<SchoolIcon color='secondary' />}
                          size='small'
                          inputProps={{
                            'aria-label': 'checkbox with small size',
                          }}
                        />
                      }
                      label='Graduated'
                      className={classes.graduatedButton}
                    />
                  </div>