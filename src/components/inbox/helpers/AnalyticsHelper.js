export const setAnalyticsContact = (props, email) => {
    if (props.snippetsFilter === "\\Inbox") {   
      const filter = props.contacts.filter(
        c =>
          c.emailAddresses[0].value.toLowerCase() === email.from
      );
      if (filter.length > 0) {
        const contact = {
          emailAddress: filter[0].emailAddresses,
          name: filter[0].names[0].displayName,
          coverPhoto: filter[0].photos[0].url
        };
        props.changeAnalyticsContact(contact);
        props.changeIsDisplayingAnalytics(true);
      } else {
        const contact = {
          emailAddress: [{ value: email.from }],
          name: email.name
        };
        // Sets contact to be displayed in analytics sidebar
        props.changeAnalyticsContact(contact);
        props.changeIsDisplayingAnalytics(true);
      }
      // ===============================================================
    } else if (props.snippetsFilter === "\\Sent" || props.snippetsFilter === "\\Draft") {
      //array of email addresses
      const filter = props.contacts.filter(c => {
        return c.emailAddresses.some(e => e.value === email.toLowerCase())     
      });
      if (filter.length > 0) {
        const contact = {
          emailAddress: filter[0].emailAddresses,
          name: filter[0].names[0].displayName,
          coverPhoto: filter[0].photos[0].url
        };
        props.changeAnalyticsContact(contact);
        props.changeIsDisplayingAnalytics(true);
      } else {
        const contact = {
          emailAddress: [{ value: email.toLowerCase() }],
          name: email.name
        };
        // Sets contact to be displayed in analytics sidebar
        props.changeAnalyticsContact(contact);
        props.changeIsDisplayingAnalytics(true);
      }
    }
  };
