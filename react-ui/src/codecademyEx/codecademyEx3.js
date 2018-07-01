db.serialize(() => {                                                                                                                          
    db.run("DROP TABLE Dog");
    db.run("CREATE TABLE Dog");
    db.run("INSERT INTO Dog (breed, name, owner, fur_color, fur_length) VALUES  ('Dachshund', 'Spike', 'Elizabeth', 'Brown', 'Short')");
  });