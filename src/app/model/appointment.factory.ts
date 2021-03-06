import {EntryCollection} from 'contentful';
import {normalizeRichContent} from './utils';
import {Appointment} from './appointment.model';

export const appointmentsCollectionBuilder = (rawAppts: EntryCollection<any>): Appointment[] => {
  return rawAppts.items.map(item => ({
    title: item.fields['headline'],
    date: new Date(Date.parse(item.fields['datum'])).toLocaleString('de').replace(/:00$/, ' Uhr'),
    description: item.fields.hasOwnProperty('details') ? normalizeRichContent(item.fields['details']) : []
  }));
};
