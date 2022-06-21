declare namespace Modal {
  export interface PatientData {
    id: number
    age: number
    sex: number
    race: number
    _height: number
    _weight: number
    waist: number
    sbp: number
    hdl: number
    triglyceride: number
    glucose: number

    bmi: number
    bmiZScore?: number
    bmiZBody?: number

    metsZBMI?: number
    metsZBMIBody?: number

    metsZWC?: number
    metsZWCBody?: number
  }
}