/* Adding User */
DROP USER gifts_admin;

CREATE USER gifts_admin IDENTIFIED BY Welcome1#Welcome1#;
GRANT RESOURCE, UNLIMITED TABLESPACE, CREATE ANY TABLE, CREATE SESSION, SELECT ANY TABLE, INSERT ANY TABLE, DELETE ANY TABLE, UPDATE ANY TABLE TO gifts_admin;


/* Adding Sequence for Auto-increment */

/* GPS_Gifts */

DROP SEQUENCE gifts_admin.GPS_Gifts_seq;

ALTER TABLE gifts_admin.GPS_Gifts ADD (
  CONSTRAINT GPS_Gifts_pk PRIMARY KEY (ID));

CREATE SEQUENCE gifts_admin.GPS_Gifts_seq START WITH 100;

CREATE OR REPLACE TRIGGER GPS_Gifts_bir 
BEFORE INSERT ON gifts_admin.GPS_Gifts 
FOR EACH ROW

BEGIN
  SELECT gifts_admin.GPS_Gifts_seq.NEXTVAL
  INTO   :new.ID
  FROM   dual;
END;
/

insert into gifts_admin.GPS_Gifts (GPSGiftID, Latitude, Longtitude, Altitude, ImageURL, RedemptionAction) values ('GG1011', -37.835311, 144.9725336, 31, 'https://i.4pcdn.org/x/1508011708146.png', 'Active');
insert into gifts_admin.GPS_Gifts (GPSGiftID, Latitude, Longtitude, Altitude, ImageURL, RedemptionAction) values ('GG1012', -37.835311, 144.9725336, 31, 'https://i.4pcdn.org/x/1508011708146.png', 'Active');
commit;

/* Redemption_GPS_Gifts */

DROP SEQUENCE gifts_admin.Redemption_GPS_Gifts_seq;

ALTER TABLE gifts_admin.Redemption_GPS_Gifts ADD (
  CONSTRAINT Redemption_GPS_Gifts_pk PRIMARY KEY (ID));

CREATE SEQUENCE gifts_admin.Redemption_GPS_Gifts_seq START WITH 100;

CREATE OR REPLACE TRIGGER Redemption_GPS_Gifts_bir 
BEFORE INSERT ON gifts_admin.Redemption_GPS_Gifts 
FOR EACH ROW

BEGIN
  SELECT gifts_admin.Redemption_GPS_Gifts_seq.NEXTVAL
  INTO   :new.ID
  FROM   dual;
END;
/

insert into gifts_admin.Redemption_GPS_Gifts (DeviceID, GPSGiftID, DateTime, RedeemedStatus) values ('D2011', 'GG1011', '2018-09-03T15:10:09', 'Redeemed');
insert into gifts_admin.Redemption_GPS_Gifts (DeviceID, GPSGiftID, DateTime, RedeemedStatus) values ('D2012', 'GG1011', '2018-09-03T15:10:09', 'Redeemed');
commit;

/* Redemption_Crosswords */

DROP SEQUENCE gifts_admin.Redemption_Crosswords_seq;

ALTER TABLE gifts_admin.Redemption_Crosswords ADD (
  CONSTRAINT Redemption_Crosswords_pk PRIMARY KEY (ID));

CREATE SEQUENCE gifts_admin.Redemption_Crosswords_seq START WITH 100;

CREATE OR REPLACE TRIGGER Redemption_Crosswords_bir 
BEFORE INSERT ON gifts_admin.Redemption_Crosswords 
FOR EACH ROW

BEGIN
  SELECT gifts_admin.Redemption_Crosswords_seq.NEXTVAL
  INTO   :new.ID
  FROM   dual;
END;
/

insert into gifts_admin.Redemption_Crosswords (DeviceID, CrosswordID, EventDateTime, EventType, EngagementCount, RedeemedStatus) values ('D2002', 'CW3011', '2018-09-03T15:15:00', 'start', 11, 'Redeemed');
insert into gifts_admin.Redemption_Crosswords (DeviceID, CrosswordID, EventDateTime, EventType, EngagementCount, RedeemedStatus) values ('D2003', 'CW3012', '2018-09-03T15:15:00', 'start', 11, 'Redeemed');
commit;

/* Redemption_Gifts */

DROP SEQUENCE gifts_admin.Redemption_Gifts_seq;

ALTER TABLE gifts_admin.Redemption_Gifts ADD (
  CONSTRAINT Redemption_Gifts_pk PRIMARY KEY (ID));

CREATE SEQUENCE gifts_admin.Redemption_Gifts_seq START WITH 100;

CREATE OR REPLACE TRIGGER Redemption_Gifts_bir 
BEFORE INSERT ON gifts_admin.Redemption_Gifts 
FOR EACH ROW

BEGIN
  SELECT gifts_admin.Redemption_Gifts_seq.NEXTVAL
  INTO   :new.ID
  FROM   dual;
END;
/

insert into gifts_admin.Redemption_Gifts (GameSourceID, GameSource, DateTime, MemberID, RedeemedStatus) values ('GS4011', 'X', '2018-09-03T15:10:09', 'M12354', 'Redeemed');
insert into gifts_admin.Redemption_Gifts (GameSourceID, GameSource, DateTime, MemberID, RedeemedStatus) values ('GS4011', 'X', '2018-09-03T15:10:09', 'M12354', 'Redeemed');
commit;
