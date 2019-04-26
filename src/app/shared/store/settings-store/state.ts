export interface State {
  selectedLanguage:   string;
  selectedCulture:    string;
  availableLanguages: Array<any>
};

export const initialState: State = {
  selectedLanguage: '',
  selectedCulture:  '',
  availableLanguages: [
    {code: 'fr', name: 'FR', culture: 'fr-FR'},
    {code: 'hr', name: 'HR', culture: 'hr-HR'},
    {code: 'en', name: 'EN', culture: 'en-EN'}
  ]
};

