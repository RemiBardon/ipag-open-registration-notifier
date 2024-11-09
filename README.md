# IPAG open registration notifier

I'd like to register for an event called "Soirées d’Observation du ciel en Hiver".
However, the [registration form] is disabled as registrations will open some time "mid November".
I wouldn't want to miss the registration so here is a script which will run as a cron task
and crawl the page to check if some time slots have been added.

[registration form]: https://ipag.osug.fr/french/grand-public/soirees-d-observation-du-ciel-en-hiver/formulaire-inscription-coupole-ipag/

This project aims to be simple but pluridisciplinary to help a beginner discover multiple
aspects of programming. It uses [JavaScript] as a language, [Vercel Cron Jobs] as a way
to periodically run the script and [Mailgun] to send notifications[^notif-options].

[JavaScript]: https://en.wikipedia.org/wiki/JavaScript
[Vercel Cron Jobs]: https://vercel.com/docs/cron-jobs
[Mailgun]: https://www.mailgun.com/

[^notif-options]: We could have used [WhatsApp's Text Messages API](https://developers.facebook.com/docs/whatsapp/cloud-api/messages/text-messages) but it requires a Meta Business account and I don't want it.
