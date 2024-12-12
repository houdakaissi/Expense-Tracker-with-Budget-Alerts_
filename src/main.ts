import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

// Merge appConfig with the HttpClient provider
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers, // Include existing providers from appConfig
    provideHttpClient(),    // Add provideHttpClient
  ],
})
  .catch((err) => console.error(err));
