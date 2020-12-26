use serde::{de::{self, IntoDeserializer}, Deserialize};
use std::fmt;

pub fn deserialize_stringified_list<'de, D, I>(deserializer: D) -> std::result::Result<Vec<I>, D::Error>
    where
        D: de::Deserializer<'de>,
        I: de::DeserializeOwned,
{
    struct StringVecVisitor<I>(std::marker::PhantomData<I>);

    impl<'de, I> de::Visitor<'de> for StringVecVisitor<I>
        where I: de::DeserializeOwned {
        type Value = Vec<I>;

        fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
            formatter.write_str("a string containing a list")
        }

        fn visit_str<E>(self, v: &str) -> std::result::Result<Self::Value, E>
            where
                E: de::Error,
        {
            println!("input: {:?}", v);
            let mut ids = Vec::new();
            for id in v.split(",") {
                let id = I::deserialize(id.into_deserializer())?;
                ids.push(id);
            }
            Ok(ids)
        }
    }

    deserializer.deserialize_any(StringVecVisitor(std::marker::PhantomData::<I>))
}

