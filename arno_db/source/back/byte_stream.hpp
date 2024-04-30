#pragma once

#include <string>
#include <vector>
#include <cstdint>

namespace adb
{

class ByteStream
{
public:
	inline bool fail() const { return m_failed; }
	inline void clear() { m_data.clear(); }

	template <typename T>
	ByteStream &operator<<( const T &val )
	{
		static_assert( std::is_arithmetic<T>() );

		constexpr size_t type_size = sizeof(T);
		const char *val_bytes = reinterpret_cast<const char*>(&val);

		for(size_t i = 0; i < type_size; ++i)
		{
			m_data.push_back( val_bytes[i] );
		}

		return *this;
	}

	template <typename T>
	ByteStream &operator>>( T &val )
	{
		static_assert( std::is_arithmetic<T>() );

		constexpr size_t type_size = sizeof(T);

		if( type_size > m_data.size() )
		{
			m_failed = true;
			return *this;
		}

		char *val_bytes = reinterpret_cast<char*>(&val);

		for(size_t i = 0; i < type_size; ++i)
		{
			const char byte = m_data.back();
			m_data.pop_back();
			val_bytes[type_size - 1 - i] = byte;
		}

		return *this;
	}

	ByteStream &operator<<( const std::string &str )
	{
		for(const char &c: str)
		{
			m_data.push_back(c);
		}
		(*this) << str.size();

		return *this;
	}

	ByteStream &operator>>( std::string &str )
	{
		std::size_t str_length;
		(*this) >> str_length;

		if( m_failed || str_length > m_data.size() )
		{
			m_failed = true;
			return (*this);
		}

		str.clear();
		str.assign(str_length, ' ');

		for(std::size_t i = 0; i < str_length; ++i)
		{
			str[str_length - i - 1] = m_data.back();
			m_data.pop_back();
		}

		return *this;
	}

private:
	std::vector<char> m_data;
	bool m_failed = false;
};

}